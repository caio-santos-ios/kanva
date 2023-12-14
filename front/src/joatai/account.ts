"use client"

import { atom } from "jotai";
import { getCookie } from "cookies-next" 

const account = getCookie("account")
export const loggedAccount = atom(account ? true : false)

const confirmation = getCookie("confirmation")
export const accountConfirmation = atom(confirmation ? true : false)
