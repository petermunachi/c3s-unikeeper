import moment from "moment-timezone";
import { toast } from "react-toastify";
import { CreateTaskData } from "./types";

export const timeDiffCalc = (dateFuture: number, dateNow: number) => {
  let diffInMilliSeconds = Math.abs(dateFuture - dateNow);

  // calculate days
  const days = Math.floor(diffInMilliSeconds / 86400);
  diffInMilliSeconds -= days * 86400;
  console.log('calculated days', days);

  // calculate hours
  const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
  diffInMilliSeconds -= hours * 3600;
  console.log('calculated hours', hours);

  // calculate minutes
  const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
  diffInMilliSeconds -= minutes * 60;
  console.log('minutes', minutes);

  let difference = '';
  if (days > 0) {
    difference += (days === 1) ? `${days} day, ` : `${days} days, `;
  }

  difference += (hours === 0 || hours === 1) ? `${hours} hour ` : `${hours} hours `;

  difference += (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`;

  return difference;
}

// TODO: Refactor code
export const validateFormData = (formData: CreateTaskData) => {
  for (const inputName in formData) {
    if (Object.prototype.hasOwnProperty.call(formData, inputName)) {
      const inputValue = formData[inputName as keyof CreateTaskData];
      if (inputName === "description") {
        if (inputValue === "") {
          toast.error(`${inputName} is required`);
          return false
        }
      }
      if (inputName === "startDate") {
        if (inputValue === 0) {
          toast.error(`${inputName} is required`);
          return false
        }
        if (Number(inputValue) > moment().unix()) {
          toast.error(`${inputName} can not be in the future`);
          return false
        }

      }
      if (inputName === "workFrom") {
        if (inputValue === 0) {
          toast.error(`${inputName} is required`);
          return false
        }

        if (Number(inputValue) > formData.workTo) {
          toast.error(`${inputName} can not be greater than WorkTo`);
          return false
        }

      }
      if (inputName === "workTo") {
        if (inputValue === 0) {
          toast.error(`${inputName} is required`);
          return false
        }
        if (Number(inputValue) > moment().unix()) {
          toast.error(`${inputName} can not be in the future`);
          return false
        }

      }
    }
  }
  return true
}
