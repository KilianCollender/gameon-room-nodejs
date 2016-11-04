var sendRub = function(conn, target, username, content, logger)
{
  logger.debug("Target \"" + target + "\" asked for light.")
  var sendTarget = target
  var sendMessageType = "player"
  var messageObject = {
    type: "event",
    bookmark: 2223,
    content: {
    }
  }

  var canTheyHaveTheSecret = Math.floor((Math.random() * 2));

  if(content.includes('lamp')){
      if(canTheyHaveTheSecret){
          messageObject.content[target] = "You rub the magic lamp, and it starts to glow. All of a sudden a huge genie erupts out of the lamp. " +
          "In a deep booming voice he announces to the room 'Hello "+username+" you have woken me from a deep sleep, however because I feel you are a true soul, I shall grant you a wish!' To you use your wish use the command /wish";
          conn.sendText("player," +
              sendTarget + "," +
              JSON.stringify({
                  "type": "location",
                  "commands": {
                      "/light": "Turn on the light",
                      "/rub":"rub an item",
                      "/wish":"Ask any wish and see if it helps gain what you seek"
                  }
              }));
      }else{
          messageObject.content[target] = "You rub the magic lamp, and it starts to glow. All of a sudden a huge genie erupts out of the lamp. " +
          "In a deep booming voice he announces to the room 'Who dares rub my lamp!! I am the almighty genie and do not wish to aid travellers, who wakes me from my sleep. Leave now and never return'";
      }
  } else {
       messageObject.content[target] = "I'm not rubbing that!!"
  }

  var messageToSend = sendMessageType + "," +
            sendTarget + "," +
            JSON.stringify(messageObject)

  conn.sendText(messageToSend);

  if(!canTheyHaveTheSecret && content.includes('lamp')){
      messageObject = {
        "type": "exit",
        "exitId": 'n',
        "content": "You are banished to the NORTH!!! ",
        "bookmark": 6019
      }

      var messageText = "playerLocation," +
                sendTarget + "," +
                JSON.stringify(messageObject)
      conn.sendText(messageText);
  }
}

module.exports = sendRub;
