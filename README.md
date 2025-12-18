# n8n-nodes-twochat

This is an n8n community node. It lets you use 2Chat WhatsApp API in your n8n workflows.

2Chat is a conversational commerce automation platform that makes WhatsApp Messenger and WhatsApp Business programmable through a unified API.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

```
npm install n8n-nodes-twochat
```

## Operations

### Message Resource
- **Send Message**: Send WhatsApp messages to individual contacts
  - Support for text messages
  - Support for media attachments (images, documents, etc.)
  - Support for location pins

- **Send Message to group**: Send WhatsApp messages to groups
	- Support for text messages
  - Support for media attachments (images, documents, etc.)
  - Support for location pins

### Phone Number Resource
- **Check Number**: Verify if a phone number is registered on WhatsApp
  - Get detailed information about the number (region, carrier, timezone)
  - Check if the number is a business account
  - Get business profile information when available

## Triggers 
- **WhatsApp Message Events**: Listen for message events
	- New Message: Triggers when a new message is either sent or received on 2Chat. Works for messages sent by agents or your users/customers.
  - Message Received: Triggers when a WhatsApp message is received on your 2Chat connected number
	- Message Sent: Triggers when a WhatsApp message is sent from your 2Chat connected number
	- New Conversation: Triggers when a new WhatsApp Conversation is started within the specified time period.
	- Message Edited: Triggers when a message is edited. It will also trigger for group messages being edited
	- Reaction Recieved: Triggers when a WhatsApp message is reacted to

- **WhatsApp Calls**: Listen for WhatsApp calls events
	- Call Made: Triggers when a new WhatsApp call is made
	- Call Received: Triggers when a new WhatsApp call is received or missed on your connected number

- **WhatsApp group**: Listen for WhatsApp group events
	- Message Received: Triggers when a new WhatsApp Group Message is received on the configured group
  - Participant Join: Triggers when someone joins a group
  - Participant Left: Triggers when someone leaves a group
	- Participant Removed: Triggers when someone is kicked/removed from a group
	- Message Reaction Received: Triggers when a group participant reacts to a message

- **Phone Calls**: Listen for phone calls events
	- Incoming completed: Triggers when an incoming phone call is completed (answered or missed)
	- Oubound Completed: Triggers when an outbound phone call is completed (answered or failed)
	- Status Update: Triggers when a phone call status changes (e.g., ringing, answered, ended)

## Credentials

You need to create a 2Chat account and get an API key to use this node.

1. Create a 2Chat account at [2Chat.co](https://2chat.co)
2. Connect a WhatsApp channel in the channels section
3. Get an API key from the developers section
4. Use this API key in the n8n credentials for the 2Chat node

## Compatibility

- Requires n8n version 1.0.0 or later

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [2Chat API Documentation](https://developers.2chat.co/docs/intro)
