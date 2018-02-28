import amqp from 'amqplib'

/**
 * Opens a new queue connection.
 * 
 * @param {string} endpoint - Queue endpoint (amqp://localhost:5672).
 * @param {string} queueName - Queue name (my-new-queue).
 * 
 * @example const { connection, channel } = await openQueueConnection('amqp://localhost:5672', 'my-new-queue')
 * 
 * @returns {Promise.<{connection: amqp.Connection, channel: amqp.Channel}>} - Connection and channel to send messanges. 
 */
declare async function openQueueConnection(endpoint:string, queueName:string);

/**
 * Send a specific message to a queue. 
 * 
 * @param {string} message - Message to be sent.
 * @param {string} queueName - Queue to send the message.
 * @param {amqp.Channel} channel - Channel to send the message.
 * @param {amqp.Options.Publish} options - Options to send the message.
 * 
 * @example const messageWasSent = await sendMessage('this is my message', 'my-new-queue', channel, { persistent: true })
 * 
 * @returns {boolean} - The result.
 */
declare async function sendMessage(message:string, queueName:string, channel:amqp.Channel, options:amqp.Options.Publish);

/**
 * Consume messages.
 *
 * @param {Channel} channel - Channel opened to the queue.
 * @param {string} queueName - Name of the queue to hook up.
 * @param {Function} fnConsume - Function to receive messages.
 * 
 * @example await consumeMessage(channel, 'my-queue-name', msg => console.log(msg))
 */
declare async function consumeMessage(channel:amqp.Channel, queueName:string, fnConsume:Function);