import {Dispatcher,Store} from "./flux";


const controlPanelDispatcher = new Dispatcher();
const UPDATE_FONT_SIZE_PREFERENCE = `UPDATE_FONT_SIZE_PREFERENCE`;
const UPDATE_USERNAME = `UPDATE_USERNAME`;

const userNameUpdateaction = (name)=>{
    return {
        type: UPDATE_USERNAME,
        value: name
    }
};

const fontSizePreferenceUpdateAcion = (size)=>{
    return{
        type: UPDATE_FONT_SIZE_PREFERENCE,
        value: size
    }

};

document.getElementById(`userNameInput`).addEventListener(`input`,({target})=>{

        const name = target.value;
        console.log("Dispatching... ",name);
        controlPanelDispatcher.dispatch(userNameUpdateaction(name));
});

document.forms.fontSizeForm.fontSize.forEach(element=>{
        element.addEventListener(`change`,({target})=>{

            controlPanelDispatcher.dispatch(fontSizePreferenceUpdateAcion(target.value));

        })
})

class UsePrefStores extends Store{
        getInitialState(){
            return localStorage[`preferences`] ? JSON.parse(localStorage[`preferences`]) : {
                username:"Leo",
                fontSize:"small"
            }
        }

        _onDispatch(action){
        switch (action.type) {
            case UPDATE_USERNAME:
                this._state.userName = action.value;
                this._emitChange();
                break;

                case UPDATE_FONT_SIZE_PREFERENCE:
                this._state.fontSize = action.value;
                this._emitChange();
                break;

        }

        }

        getUsersPreferences(){
            return this._state;
        }
}

const userPrefsStore = new UsePrefStores(controlPanelDispatcher);

userPrefsStore.addListener((state)=>{
    render(state);
    localStorage[`preferences`] = JSON.stringify(state);
});


const render = ({userName, fontSize})=>{
document.getElementById("userName").innerText = userName;
document.getElementsByClassName("container")[0].style.fontSize = fontSize === "small"?"16px":"24px";
document.forms.fontSizeForm.fontSize.value = fontSize;
};

render(userPrefsStore.getUsersPreferences());


