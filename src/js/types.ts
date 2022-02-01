import { AbstractView } from "./views/AbstractView";

export interface Route {
  path: string,
  component: AbstractView
}