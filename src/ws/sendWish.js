var sendWish = function(conn, target, username, content, logger)
{
  logger.debug("Target \"" + target + "\" asked for examination.")
  var sendTarget = target
  var sendMessageType = "player"
  var messageObject = {
    type: "event",
    bookmark: 2223,
    content: {
    }
  }

  if(content.includes('secret')){
      messageObject.content[target] = "You wish to know my secret? Well your wish is my command, the secret word you want is 'Gunpowder'";
  } else {
      messageObject.content[target] = "Your wish is my command. Not that it will help you";
  }

  var messageToSend = sendMessageType + "," +
            sendTarget + "," +
            JSON.stringify(messageObject)

  conn.sendText(messageToSend)
}

module.exports = sendWish;
