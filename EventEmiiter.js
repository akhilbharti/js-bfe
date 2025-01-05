/**
 * Implement an EventEmitter class similar to the one in Node.js 
 * that follows such an observer pattern.
 * const emitter = new EventEmitter();

function addTwoNumbers(a, b) {
  console.log(`The sum is ${a + b}`);
}
emitter.on('foo', addTwoNumbers);
emitter.emit('foo', 2, 5);
// > "The sum is 7"

emitter.on('foo', (a, b) => console.log(`The product is ${a * b}`));
emitter.emit('foo', 4, 5);
// > "The sum is 9"
// > "The product is 20"

emitter.off('foo', addTwoNumbers);
emitter.emit('foo', -3, 9);
// > "The product is -27"

 * 
 *  */

/**
 * 1. can `emitter.emit()` be called without any arguments beside  the eventName?
 * yes
 * 2. can same listner be added multiple times with the same eventName?
 * lets assume yes it can, it will be called once for each time it is added when eventName is emitted in the order they were added.
 * 3 Following up on the question above, what should happen if a listener is added multiple times and emitter.off() is being called once for that listener?
 * The listner will only be removed once.
 * 4. What should the `this` value of the listners be?
 * It can be `null`
 */

/**
 * we can consider a map or a flatArray
 * map- events={
 * foo:[lis1,lis2],
 * bar:[lis1, lis2]
 * 
 * fast lookup
 * }
 * 
 * flatArray=[
 * {eventName:'foo', listner:lis1}]
 * 
 * //require O(n) for lookup, 
 */

class EventEmitter {
    constructor() {
        // avoid creating using `{}` to exclude unwanted properties on prototype
        this._events = Object.create(null);
    }

    /**
     * @param {string} eventName
     * @param {Function} listener
     * @returns {EventEmitter}
     */
    on(eventName, listners) {
        // if eventName exist in _events, push the listner, otherwise initialize an empty array to hold listners, and return this for chaining

        if (!Object.hasOwn(this._events, eventName)) {
            this._events[eventName] = [];
        }

        this._events[eventName].push(listners);
        return this;
    }
    /**
     * @param {string} eventName
     * @param {Function} listener
     * @returns {EventEmitter}
     */
    off(eventName, listner) {
        //check if eventName exists or has any listners, if not we can return early, otherwise, we need to return the first occurance of the listner and remove only one instance we will use splice.
        if (!Object.hasOwn(this._events, eventName)) {
            return this;
        }

        const listners = this._events[eventName];
        const index = listners.findIndex((x) => x === listner);

        if (index < 0) {
            return this;
        }
        this._events[eventName].splice(index, 1);
        return this;
    }
    /**
     * 
     * @param {string} eventName 
     * @param  {...any} args
     * @returns {boolean} 
     */
    emit(eventName, ...args) {
        // return false, non-existing eventName or eventName without listners
        if (!Object.hasOwn(this._events, eventName) || this._events[eventName].length === 0) {
            return false;
        }

        //make clone of the listners
        const listners = this._events[eventName].slice();
        listners.forEach(element => {
            element.apply(null, args)
        });
        return true;
    }
}