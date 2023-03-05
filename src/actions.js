import { Fields } from './setup.js'

/**
 * Setup the actions.
 *
 * @access protected
 * @since 1.0.0
 */
export function updateActions() {
	this.setActionDefinitions({
		next: {
			name: 'Goto next page',
			options: [],
			callback: () => {
				this.sendCommand('/goto/next')
			},
		},
		previous: {
			name: 'Goto previous page',
			options: [],
			callback: () => {
				this.sendCommand('/goto/prev')
			},
		},
		goto_page: {
			name: 'Goto page',
			options: [Fields.Page],
			callback: ({ options }) => {
				this.sendCommand(`/goto/page/${options.page}`)
			},
		},
	})
}
