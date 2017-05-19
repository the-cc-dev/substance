import { Command } from '../../ui'

class FindAndReplaceCommand extends Command {

  getCommandState({editorSession}) {
    let findAndReplaceManager = editorSession.getManager('find-and-replace')
    let findAndReplaceState = findAndReplaceManager.getState()
    return findAndReplaceState
  }

  execute() {
    // Do nothing
  }
}

export default FindAndReplaceCommand