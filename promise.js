(() => {
    const PENDING = 'pedding'
    const RESOLVED = 'resolved'
    const REJECTED = 'rejected'

    function MyPromise(fn) {
        this.state = PENDING

        this.resolvedCallbacks = []

        this.rejectedCallbacks = []

        this.value = ''

        const resolve = (value) => {
            if (value instanceof MyPromise) {
                return this.then(resolve, reject)
            }

            if (this.state === PENDING) {

                this.state = RESOLVED

                this.value = value

                const length = this.resolvedCallbacks.length

                for (let i = 0; i < length; i++) {
                    const callback = this.resolvedCallbacks[i]

                    this.value = callback.call(this, this.value)
                }
            }
        }

        const reject = (value) => {
            if (this.state === PENDING) {
                this.state = REJECTED

                this.value = value

                const length = this.rejectedCallbacks.length

                for (let i = 0; i < length; i++) {
                    const callback = this.rejectedCallbacks[i]

                    this.value = callback.call(this, this.value)
                }
            }
        }

        fn(resolve, reject)
    }

    MyPromise.prototype.then = function (onResolved, onRejected) {
        if (this.state === PENDING) {
            this.resolvedCallbacks.push(onResolved)
            this.rejectedCallbacks.push(onRejected)
        } else if (this.state === RESOLVED) {
            this.value = onResolved.call(this, this.value)
            return this
        } else {
            this.value = onRejected.call(this, this.value)
            return this
        }
    }
}) ()
