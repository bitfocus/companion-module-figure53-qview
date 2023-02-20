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
			options: [
				{
					label: 'Page',
					type: 'number',
					id: 'page',
					default: 1,
					min: 1,
					max: 9999,
				},
			],
			callback: ({ options }) => {
				this.sendCommand(`/goto/page/${options.page}`)
			},
		},
	})
}
