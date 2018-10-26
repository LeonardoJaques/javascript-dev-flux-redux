export class Store{
    constructor(dispatcher){
        this._listener =[];
        this._state = this.getInitialState();
        dispatcher.register(this._onDispatch.bind(this));
    }

    _onDispatch(){
        throw new Error("Subclassess must override _onDispach method of Flux Store");
    }


    getInitialState(){
        throw new Error("Subclassess must override _onDispach method of Flux Store");
    }

    addListener(listener){
         this._listener.push(listener);
    }

    _emitChange(){
        this._listener.forEach(listener=>listener(this._state));
    }
}
