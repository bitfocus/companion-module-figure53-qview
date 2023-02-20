import { InstanceBase, Regex, runEntrypoint } from '@companion-module/base'
import { updateActions } from './actions.js'

/**
 * Companion instance class for Figure53 QView.
 *
 * @extends InstanceBase
 * @since 1.0.0
 * @author Keith Rocheck <keith.rocheck@gmail.com>
 */
class Figure53QviewInstance extends InstanceBase {
	/**
	 * Create an instance of a QView module.
	 *
	 * @param {Object} internal - Companion internals
	 * @since 1.0.0
	 */
	constructor(internal) {
		super(internal)

		this.updateActions = updateActions.bind(this)
	}

	/**
	 * Process an updated configuration array.
	 *
	 * @param {Object} config - the new configuration
	 * @access public
	 * @since 1.0.0
	 */
	async configUpdated(config) {
		this.config = config
	}

	/**
	 * Clean up the instance before it is destroyed.
	 *
	 * @access public
	 * @since 1.0.0
	 */
	async destroy() {
		this.log('debug', 'destroy', this.id)
	}

	/**
	 * Creates the configuration fields for web config.
	 *
	 * @returns {Array} the config fields
	 * @access public
	 * @since 1.0.0
	 */
	getConfigFields() {
		return [
			{
				type: 'textinput',
				id: 'host',
				label: 'Target IP',
				width: 8,
				regex: Regex.IP,
			},
			{
				type: 'textinput',
				id: 'port',
				label: 'Target Port',
				width: 4,
				regex: Regex.PORT,
				default: 60000,
			},
		]
	}

	/**
	 * Main initialization function called once the module
	 * is OK to start doing things.
	 *
	 * @access public
	 * @since 1.0.0
	 */
	async init(config) {
		this.config = config

		this.updateActions()

		this.updateStatus('ok')
	}

	/**
	 * Send an OSC command
	 *
	 * @param {string} cmd - the command
	 * @access protected
	 * @since 2.0.0
	 */
	sendCommand(cmd) {
		if (cmd && this.config.host !== undefined && this.config.port !== undefined) {
			this.log('debug', `Sending command: ${cmd}`)
			this.oscSend(this.config.host, this.config.port, cmd)
		} else {
			this.log('debug', `Host, port, or command not defined: ${cmd}`)
		}
	}
}

runEntrypoint(Figure53QviewInstance, [])
