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
export async function openQueueConnection(endpoint, queueName) {
  const connection = await amqp.connect(endpoint)
  const channel = await connection.createChannel()
  
  await channel.assertQueue(queueName, { durable: true })

  return {
    connection,
    channel
  }
}

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
export async function sendMessage(message, queueName, channel, options) {
  return await channel.sendToQueue(
    queueName, 
    Buffer.from(message), 
    options
  )
}

/**
 * Consume messages.
 *
 * @param {Channel} channel - Channel opened to the queue.
 * @param {string} queueName - Name of the queue to hook up.
 * @param {Function} fnConsume - Function to receive messages.
 * 
 * @example await consumeMessage(channel, 'my-queue-name', msg => console.log(msg))
 */
export async function consumeMessage(channel, queueName, fnConsume) {
  await channel.prefetch(1)
  await channel.consume(queueName, msg => {
    fnConsume(msg)

    channel.ack(msg)
  }, { noAck: false })
}