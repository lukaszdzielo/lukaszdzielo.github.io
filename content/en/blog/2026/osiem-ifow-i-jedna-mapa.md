---
date: 2026-05-28
title: Eight ifs and one map
description: How to replace a long list of "if the action is X, open dialog X" with a simple object in Vue 3 – and when a plain if is still the better choice.
tags:
- vue
- javascript
- code-review
kind: post
art: /art/blog/osiem-ifow.svg
ogImage: /og/blog/osiem-ifow-en.jpg
draft: false
---

In a code review I found a function that handled the action menu next to a table row. Every action opened its own dialog, and the function had eight `if` blocks – one under another, almost the same. The code worked, but I was curious if it could be shorter. The situation is real, but the code below is an example – I changed the names and data to a list of orders in a shop admin panel.

## The starting point

Every dialog has its own variable. When the variable gets an order, the dialog opens:

```js
const refundTarget = ref(null)
const cancelTarget = ref(null)
const shipTarget = ref(null)
const addressTarget = ref(null)
// … and so on, eight variables

function handleAction(action, close) {
  if (action.key === 'refund') {
    refundTarget.value = props.order
  }
  if (action.key === 'cancel') {
    cancelTarget.value = props.order
  }
  if (action.key === 'ship') {
    shipTarget.value = props.order
  }
  if (action.key === 'change_address') {
    addressTarget.value = props.order
  }
  // … four more blocks like this
  if (typeof close === 'function') close()
}
```

All the blocks do the same thing. Only one thing changes: which variable gets the order.

## A map instead of conditions

If the only difference is the action name and the variable, it's enough to keep that pair in an object:

```js
const actionTargets = {
  refund: refundTarget,
  cancel: cancelTarget,
  ship: shipTarget,
  change_address: addressTarget,
  // …
}

function handleAction(action, close) {
  const target = actionTargets[action.key]
  if (target) target.value = props.order
  close?.()
}
```

It works exactly the same. In the first version every `if` was checked separately, but the keys don't repeat, so at most one could match anyway. An unknown action still changes nothing. `close?.()` calls the function only if we get one – just like `typeof close === 'function'`.

The biggest gain shows up with changes. A new action is one line in the object, not another copied block where it's easy to leave the old variable name.

## One step further: a single state

After looking at this code for longer, I noticed the real problem wasn't the conditions, but the eight separate variables. In theory, several of them could have a value at the same time, so several dialogs could be open at once. But at any moment only one dialog is open, for one order.

This can be kept in one variable:

```js
const activeAction = ref(null) // { key, order } or null

function handleAction(action, close) {
  activeAction.value = { key: action.key, order: props.order }
  close?.()
}
```

```vue
<RefundDialog
  v-if="activeAction?.key === 'refund'"
  :order="activeAction.order"
  @close="activeAction = null"
/>
```

Now there's nothing left to map. Closing any dialog is `activeAction = null`, and two dialogs simply can't appear at once. It's a bigger change, though, because it touches the template and every dialog – in the review I only suggested the map.

## When to keep the if

A map isn't the answer to every set of conditions. I wouldn't change the code when:

- there are only two or three cases – a plain `if` is quicker to read than an object and a function,
- every branch does something different (other arguments, an API request, another dialog) – then `if` or `switch` shows it directly,
- the conditions aren't a simple comparison, e.g. number ranges or several fields at once.

A map works well in one situation: when many branches do the same thing and differ only in *where* or *what* they use.

## How to suggest it

In my comment I didn't write "rewrite this". I asked if the author had thought about mapping it, pasted a ready version and left the choice open – they could also stay with `if`/`else`. The code was correct, so it was a suggestion, not a bug to fix. Ready code in a comment saves the other person time, and a question instead of an order leaves room for a reason I might not know about.
