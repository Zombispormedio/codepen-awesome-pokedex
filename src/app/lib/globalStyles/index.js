import React, { Component } from "react"
import Typography from "typography"

const globalStyles = new Typography({
	baseFontSize: "25px",
	baseLineHeight: 1.666,
	scaleRatio: 2,
	baseLineHeight: 1.5,
	headerColor: "hsla(0,0%,0%,0.8)",
	headerFontFamily: ["VT323", "monospace"],
	headerWeight: 400,
	bodyColor: "hsla(0,0%,0%,0.8)",
	bodyFontFamily: ["VT323", "monospace"],
	bodyWeight: 400,
	overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
		html: {
			overflow: "hidden"
		}
	})
})

export const rhythm = globalStyles.rhythm

export const withGlobalStyles = TargetComponent =>
	class WithGlobalStyles extends Component {
		constructor() {
			super()
			globalStyles.injectStyles()
		}
		render() {
			return <TargetComponent {...this.props} />
		}
	}
