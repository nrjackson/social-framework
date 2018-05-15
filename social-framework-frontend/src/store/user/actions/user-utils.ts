import { BareActionContext } from "vuex-typex"
import { UserState } from "../state"
import { RootState } from "../../index"
import { UserService } from '../../../service/UserService'
import TYPES from '../../../config/Types';
import container from "../../../config/DependencyConfig";
import { Meta } from "../../../model/meta";
import userStore from "../user-store";
import { IUser } from "../../../model/user";
import { MetaService } from "../../../service/MetaService";

const userService = container.get<UserService>(TYPES.UserService);

const userUtils = {
    get userService() {return userService;},
}

export default userUtils;
