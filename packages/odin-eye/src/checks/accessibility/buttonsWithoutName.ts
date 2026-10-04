import type { Issue } from '../../types'

export function checkButtonsWithoutName(): Issue[] {
    const buttons = Array.from(document.querySelectorAll("button"))
    const buttonsWithoutName = buttons.filter(button => !button.hasAttribute("aria-label") && !button.textContent?.trim())

    return buttonsWithoutName.map((button, index): Issue => ({
        id: `button-${index}`,        
        category: "accessibility",    
        severity: "error",   
        title: "Button without accessible name",
        description: "This button has no text or aria-label, so screen readers can't tell what it does. Add visible text or an aria-label.",
        element: button, 
    }))
}