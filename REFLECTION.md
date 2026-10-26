# Week 1 reflection

Answer each question in 1–3 sentences, in your own words.

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?

   Imperatively is when I write every step myself to find the element, create new elements, change their text and add or remove them whenever something changes. Declaratively is when I only describe what the page should look like for the current data, and React works out which DOM changes are needed when the data changes.

2. Why must a component name start with a capital letter?

   JSX uses the first letter to tell components apart from HTML tags. And because if I write `<menuList />` it is treated as an HTML tag called "menulist" that does not exist, while `<MenuList />` tells React to call my `MenuList` function.

3. What does a fragment <>...</> do, and why not just use a <div>?

   A component can only return one parent element, and a fragment groups several elements without adding anything to the page. And using `<div>` would add an extra element to the DOM, which can break layouts such as a grid or flex container and clutters the HTML.

4. Name one benefit of splitting the UI into small components.

   Each component can be reused. In CampusEats I write `VendorCard` once and use it for every vendor in the list, so a fix in that one file updates every card.
