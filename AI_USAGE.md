# AI usage log

Using AI never costs marks; a vague or missing log does.
Add a new section every week, before you tag. Did not use AI? Write "None" under Tool(s).

## Week 1
- Tool(s):
- What I asked for:
- What I kept, changed or rejected, and why:
- One thing the AI got wrong and how I fixed it:

## Week 2
- Tool(s): Antigravity (Gemini)
- What I asked for: Why my CampusEats website was showing a completely blank white screen.
- What I kept, changed or rejected, and why: I kept the explanation and fix. The screen was blank because of a crash: the main `App.jsx` file passed a function called `onAdd` to `MenuList.jsx`, but `MenuList` forgot to catch/receive it in its parameters (`props`). So when `MenuList` tried to use `onAdd`, JavaScript crashed with "onAdd is not defined" and hid the whole page. Adding `onAdd` to `MenuList({ items, onAdd })` and linking it to the "Add to cart" button in `MenuItemCard` fixed the crash and made the button work.
- One thing the AI got wrong and how I fixed it: None. It found the missing prop right away and explained why React crashed.

## Week 3
- Tool(s): Claude Code (Claude)
- What I asked for: built my personal feature (filter by category), added the 600 ms loading delay from the stretch task, and fixed a lint error by moving the loading/error reset out of the effect into the Try again handler.
- What I kept, changed or rejected, and why:
- One thing the AI got wrong and how I fixed it:
