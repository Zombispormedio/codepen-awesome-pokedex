import React, { Component } from "react"

export const withServiceWorker = TargetComponent =>
	class WithServiceWorker extends Component {
		constructor() {
			super()
			//navigator.serviceWorker.register(process.env.SW_PATH)
		}
		render() {
			return <TargetComponent {...this.props} />
		}
	}
