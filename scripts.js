// const one = querySelector("body");
// one.style.backgroundColor = "black";

const multiStepForm = document.querySelector("[data-multi-step]");
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")];
const progressBarSteps = [...document.querySelectorAll(".step")];
let currentStep = parseInt(
  formSteps.findIndex((step) => {
    return step.classList.contains("active");
  })
);
console.log(currentStep);

if (currentStep < 0) {
  currentStep = 0;
  progressBarSteps[currentStep].classList.add("active-step");
  formSteps[currentStep].classList.add("active");
}

multiStepForm.addEventListener("click", (e) => {
  const validityCheck = () => {
    const inputs = [...formSteps[currentStep].querySelectorAll("input")];
    const allValid = inputs.every((input) => {
      console.log(input.reportValidity());
      return input.reportValidity();
    });
    return allValid;
  };
  if (e.target.matches("[data-next]")) {
    if (!validityCheck()) return;
    currentStep++;
    progressBarSteps[currentStep].classList.add("active-step");
  } else if (e.target.matches("[data-previous]")) {
    progressBarSteps[currentStep].classList.remove("active-step");
    currentStep--;
  } else {
    return;
  }

  showCurrentStep();
});

const showCurrentStep = () => {
  // this is an easy solution, but not the correct one
  //   formSteps.forEach((step) => step.classList.remove("active"));
  //   formSteps[currentStep].classList.add("active");
  //   correct one:
  formSteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });
};
multiStepForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(multiStepForm);
});
