function toggleStrikeThrough(checkbox) {
    var label = checkbox.nextElementSibling;
    if (checkbox.checked) {
      label.classList.add("strike-through");
    } else {
      label.classList.remove("strike-through");
    }
  }
  