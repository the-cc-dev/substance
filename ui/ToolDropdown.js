import ToolGroup from './ToolGroup'
import Menu from './Menu'
import Tooltip from './tooltip'
import { forEach } from '../util'

/*
  ```
  $$(ToolDropdown, {
    name: 'text-types',
    type: 'tool-dropdown',
    contextual: true,
    style: 'minimal', // icon only display
    commandGroups: ['text-types']
  })
  ```
*/
class ToolDropdown extends ToolGroup {

  /*
    Make sure the dropdown is closed each time we receive new props
  */
  willReceiveProps() {
    this.setState({showChoices: false})
  }

  render($$) {
    let Button = this.getComponent('button')
    let commandStates = this._getCommandStates()
    let el = $$('div').addClass('sc-tool-dropdown')
    el.addClass('sm-'+this.props.name)
    let activeCommandName = this._getActiveCommandName(commandStates)

    if (this.hasEnabledTools(commandStates)) {
      let toggleButton = $$(Button, {
        icon: activeCommandName,
        dropdown: true,
        active: this.state.showChoices,
        theme: 'dark' // TODO: use property
      }).on('click', this._toggleChoices)
      el.append(toggleButton)
      if (this.state.showChoices) {
        el.append(
          $$('div').addClass('se-choices').append(
            $$(Menu, {
              commandStates: commandStates,
              items: this._getMenuItems(commandStates)
            })
          )
        )
      } else {
        let tooltipText = this._getTooltipText()
        if (tooltipText) {
          el.append(
            $$(Tooltip, {
              name: tooltipText
            })
          )
        }
      }
    }
    return el
  }

  _getTooltipText() {
    return this.context.labelProvider.getLabel(this.props.name)
  }

  /*
    Turn commandStates into menu items
  */
  _getMenuItems(commandStates) {
    let menuItems = []
    forEach(commandStates, (commandState, commandName) => {
      menuItems.push({
        command: commandName
      })
    })
    return menuItems
  }

  _getActiveCommandName(commandStates) {
    let activeCommand
    forEach(commandStates, (commandState, commandName) => {
      if (commandState.active && !activeCommand) {
        activeCommand = commandName
      }
    })
    return activeCommand
  }

  _toggleChoices() {
    this.setState({
      showChoices: !(this.state.showChoices)
    })
  }
}

export default ToolDropdown
