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
- One thing the AI got wrong and how I fixed it: When I said the "Loading menus…" test failed, the AI said my code was fine and told me to slow the network in DevTools. It did not point to the 600 ms delay in the lab sheet's stretch task. I gave it the lab sheet, and the delay it then added is what made the loading message visible.

## Week 4
- Tool(s): Claude Code (Claude)
- What I asked for: My app stopped working after I put the Part A code-along into my CampusEats App.jsx, so I asked why. Then I gave it the Lab 4 sheet, asked what I still had to do, and asked it to build the Part B work: the useLocalStorage (with try/catch), useVendors and useCart hooks, the CartContext and CartProvider, a Layout with Outlet, the five pages (Home, Vendor, Cart, Orders, NotFound), NavLink in the header, VendorCard as a Link, useNavigate after checkout, and my Week 4 feature step (keeping the category in the URL with useSearchParams).
- What I kept, changed or rejected, and why: 
- One thing the AI got wrong and how I fixed it: At first it told me to replace my CampusEats App with the code-along demo routes. But the code-along was supposed to be a separate project (week4-codealong), so that would have thrown away my Week 3 app. Once I showed it the lab sheet, it kept my Week 3 logic and moved it into hooks and the cart context instead.

## Week 5
- Tool(s): Claude Code (Claude)
- What I asked for: My page was blank after I typed in the Part B code, so I sent a screenshot of the console error ("Invalid hook call") and asked why. Then I asked it to finish my answers for TODOs 1 to 4 in AuthProvider and LoginPage, to check my work against the Lab 5 sheet, to check my attempt at my Week 5 feature step in MenuList (remember each user's category), and in the end to implement that step and fix my RegisterPage. I also asked how to commit, push and tag safely.
- What I kept, changed or rejected, and why: I typed the starter files and wrote my own answers first, and the AI corrected them. I kept its fixes because each one came with a reason I could follow:
  - Header.jsx: I had pasted the lab snippet above the Header function. Hooks (useAuth, useNavigate) only work inside a component, so it moved them, handleLogout and the Log in / Log out JSX inside Header.
  - App.jsx: I used AuthProvider, ProtectedRoute and LoginPage without importing them. It added the imports.
  - authErrors.js: two messages were split over two lines, which is a syntax error. It joined them.
  - AuthProvider (TODOs 1 and 2): my return signInWithEmailAndPassword(...) and return signOut(auth) lines were correct but written after the closing } of login and logout, so the functions were empty and the stray return stopped the provider rendering. It moved them inside.
  - LoginPage (TODOs 3 and 4): I wrote Login(...) with a capital L and no await. It changed it to await login(email, password) then navigate(goTo, { replace: true }), and explained that without await a wrong password never reaches the catch. loginWithGoogle takes no arguments because it uses the pop-up.
  - RegisterPage: my copy had two handleSubmit functions, still used login instead of register, and checked the name with try/catch, which never fails. It merged them into one handleSubmit with an if check that sets the error and returns, removed the Google button, and changed the button and link text to match the sheet.
  - Week 5 feature: my attempt was one line, useLocalStorage('ce-category-' + user.uid, 'All'), with no imports, no user, and the result not stored. The AI wrote the working version: MenuList reads user from useAuth, saves the category under ce-category-<uid>, and still lets ?cat= in the URL win so my Week 4 step keeps working. It also changed useLocalStorage so a null key means "do not save" (for guests) and so it reloads when the key changes.
  - What I learned: hooks cannot go inside an if, so the guest case is handled with a null key instead; and after a refresh the user is null for a moment until Firebase answers, which would have saved "All" over my stored category if the hook did not reload on a key change.
- One thing the AI got wrong and how I fixed it: The first time I asked it to check my work, the lab sheet PDF I attached came through blank, so it could only check that the code ran. It missed things only the sheet says: RegisterPage should drop the Google button and use the Register / Creating… text, .env.local needs all six values, and B5 (my feature step) had not been started. It told me it could not read the sheet. I attached the PDF again, and the second check found these.
