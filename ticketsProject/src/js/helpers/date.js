import { format } from "date-fns";

/**
 * 
 * @param {String} str 
 * @param {String} type 
 */
export function formatDate(str, type) {
  let date = new Date(str);
  return format(date, type);
}
