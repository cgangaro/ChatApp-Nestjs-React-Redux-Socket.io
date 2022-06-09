import { io } from "socket.io-client";
import { validateInput } from "../../Utils/logUtils";
import { LogActionType } from "../Action-Types";
import { logAction } from "../Actions";

interface UtilsData {
  socket: any;
}

export const initialState: UtilsData = {
  socket: io('http://localhost:4000')
};

export const utilsReducer = (state: UtilsData = initialState, action: { type: any; }) => {
    switch (action.type) {
        default:
        return state;
    }
};

