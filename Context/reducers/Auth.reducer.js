import isEmpty from "../../assets/common/is-empty";
import { SET_CURRENT_USER } from "../actions/Auth.actions"


export default function (state, action) {
   switch (action.type) {
      case SET_CURRENT_USER:
         return {
            ...state,
            isAuthenticated: !isEmpty(action.payload), //Nếu isEmpty trả về TRUE tức là đấy là rỗng => isAuthen: false, FALSE tức là có giá trị => isAuthen: true
            user: action.payload,
            userProfile: action.userProfile
         };
      default: 
         return state;
   }
      
   
}
