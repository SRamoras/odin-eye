import type { Issue } from "../../types";

const IGNORED_TYPES = ["hidden", "submit", "button", "reset"];

export function checkInputsWithoutLabel(): Issue[] {
    const fields = Array.from(document.querySelectorAll("input, select, textarea"));

    const fieldsWithoutLabel = fields.filter((field) => {
        const type = field.getAttribute("type") ?? "";
        if (IGNORED_TYPES.includes(type)) return false;

        const hasAriaLabel = field.getAttribute("aria-label")?.trim();
        const hasLabelFor = field.id && document.querySelector(`label[for="${field.id}"]`);
        const isInsideLabel = field.closest("label");

        return !hasAriaLabel && !hasLabelFor && !isInsideLabel;
    });

    return fieldsWithoutLabel.map((field, index): Issue => ({
        id: `input-label-${index}`,
        category: "accessibility",
        severity: "error",
        title: "Form field without label",
        description:
        "Screen readers can't tell what this field is for. Add a <label> linked to it, wrap it in a <label>, or add an aria-label. A placeholder is not enough.",
        element: field,
    }));
}