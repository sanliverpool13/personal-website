import { FlexBoxComponent } from "@/types";

export function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// export const getFlexBoxComponent = (type: string) {
//   switch(text){
//     case FlexBoxComponent.direction:
//       return (<FlexDirection />)
//   }
// }
