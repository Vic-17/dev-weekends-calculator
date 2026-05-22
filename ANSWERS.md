# Assessment Answers — Tip Calculator

### 1. How to run
This project uses zero external dependencies or package managers, making it safe to run on any computer.
1. Download or clone this directory.
2. Double-click the `index.html` file to run it locally inside your preferred browser.
* No local compilation command or installation steps are required.

### 2. Stack & design choices
* **Stack Choice:** I purposely chose a native vanilla stack (**HTML5, CSS3, and modern JavaScript**) specifically to match the **Beginner Track**. By avoiding complex build frameworks, compilers, and configurations, the delivery remains clean, readable, and highly optimized for core functionality.
* **Design Decision 1 (Grid Layout):** I used a CSS grid matching `grid-template-columns: 1fr` on small devices, changing to a side-by-side `1fr 1fr` balance on displays matching `768px` or wider. This ensures users on phones can naturally type downwards without overlapping elements, while large screens utilize the layout efficiently without unnecessary empty spacing.
* **Design Decision 2 (Dark-Mode Result Container):** The visual results panel intentionally uses a stark dark-slate theme background (`#111827`) contrasting against clean light typography. This structural visual distinction isolates the outputs away from inputs, immediately leading the consumer's gaze to the answers they came to find.

### 3. Responsive & accessibility
* **Responsive Layout:** On a narrow 360px display, the application collapses dynamically into a linear stack, expanding input fields across the safe viewable horizon so modern smartphone keyboards don't clip text labels. On a wide 1440px desktop browser, elements reposition side-by-side to maintain proportional spacing.
* **Handled Accessibility Feature:** Color contrast scales comfortably past standard WCAG AA metrics. Error strings appear explicitly underneath inputs using custom aria-inspired configurations to stay completely distinct without flashing native dialog behaviors.
* **Skipped Accessibility Feature:** I skipped building custom keyboard trap focus locks across the button arrays. Instead, it falls back onto structural browser tab orders, keeping the development clean while retaining functional accessibility.

### 4. AI usage
* **Where AI was used:** I collaborated with AI to structure safe input bounds checking inside `script.js` and structure basic base styles for the UI layout blocks.
* **Modifications Applied:** The model output recommended native browser validation tooltips alongside basic alerts to show layout faults. I intentionally overrode this approach, replacing it with an explicitly rendered structural error tracking element array inside the DOM (`#bill-error`, `#tip-error`, `#people-error`) to keep the user interface fluid and professional.

### 5. Honest gap
The CSS styling logic resets components manually instead of relying on standard modern form reset schemas. Given an extra day, I would rewrite the state container utilizing modern semantic web forms, binding variables directly to custom reactive HTML data parameters to eliminate manual style syncing overheads entirely.

### 6. Rounding Policy
* **Chosen Approach:** Ceiling Rounding (`Math.ceil`) to the nearest cent.
* **Defense:** When splitting bills evenly among small groups, division often results in infinitely repeating decimals (e.g., $100 split 3 ways is $33.3333...). If we use traditional rounding, the total collected amounts to $99.99 ($33.33 * 3), leaving a 1-cent deficit. By rounding upwards to the nearest penny ($33.34), the group ensures the venue is fully compensated, and any fractional remainders simply form a tiny bonus tip for the waitstaff.