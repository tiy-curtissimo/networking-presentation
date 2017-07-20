# OSI Conceptual Model of Network Communication

Right off the bat, we should note that this is a
*conceptual* model, not a real one. It modularizes and
layers responsbilities with fairly clear delineations.
One could consider this an *ideal* network
organization, or an *archetypal* organization. To my
knowledge, no one actually follows it in their
implementation of a network stack. Like many ISO
standards, much of its formal theory does not make it
into the real world of actual implementation, but the
powerful concepts that the OSI model present are a key
element in most modern network system designs.

I'm sorry, but I'm going to use a post office metaphor
for this because I can't really think of a better
real-world analogy. So, thank Goodness you're old
enought to have actually sent something by "snail
mail". Otherwise, the example may have just gone out
the window.

This is a seven-layer model where each layer is a step
in sending a message from one process to another. You
and I both know that that could be on the same
computer to the same process, if we wanted to be
inefficient with our communication. For most people,
though, this means checking email and buying something
on Amazon or uploading a video to YouTube.

And, that's what we're going to pretend, that you're
going to upload a recently recorded screencast that
you've made. And, inside your computer, as the file
passes from your browser to the outbound network port,
that it will go through the Computer Post Office™.

Let's get started.

## Layer 8 - You!

Ok, so there's no real "Layer 8", not in the original
spec, anyway. Infosec defind "the user" as Layer 8, so
you're stuck with it. You've made your movie, encoded
it to Ogg, and are ready to send it to YouTube. You
click the button and...

## Layer 7 - Application Layer

The Application Layer deals with the high-level
functions of programs that may use the network.
From the network's point of view, this is the user
interface and all functions not pertaining directly to
network operation occur at this layer. It exists to
exchange data between programs running on the source
and destination hosts. There is no API defined by OSI
for this layer. It's just the way the software
application will access the network.

In the metaphor, the movie that you've encoded has
been printed out into 29,923,182 still images by the
local print shop. All of those sheets of paper are
handed over from the browser to the Application Layer
Counter. You've dumped them at this Post Office with
where you want it to go, threw some cash on the
counter, and walked out.

## Layer 6 - Presentation Layer

Let's stop here at the Presentation Layer for just a
moment because, of all the layers in OSI, this is the
layer with the clearest responsibilities. It handles
the transformation of the data coming at it from the
Application Layer into a common structure that the
lower layers will use.

The primary function for this layer is to ensure that
a common data format is used. For example, if the
network requires your characters to be in UCS2 and
your application uses UTF16, then there could be
problems. The presentation layer handles the
conversion for you.

Not only will the Presentation Layer change character
encoding, but it can also handle other types of data
representation, if needed. Changing all CRLFs to LFCRs
or little-endian representations to big-endian
representations, the Presentation Layer will make sure
the data gets correctly represented for the specified
payload.

The Presentation Layer will also compress data that
it receives. Smaller payloads make for happier
networks, from what I hear.

Finally, encryption takes place in this layer. The
implementation of TLS/SSL is often described as a
"Layer 6" implementation, where the encryption of the
data stream occurs before getting to lower layers.

Back to the metaphor, let's say that the little
Tron-like person who received the 29,923,182 pieces of
paper has passed them on to the Presentation Station.
This person takes a look at all these sheets of
letter-sized paper. This particular Post Office really
likes using A4, so the person changes the size of all
the sheets of paper. Then, the person realizes that
there are images that are identical because nothing
changed between the movie frames. So, that person
discards the extra ones and writes a little note about
the duplicates. Then, they decide to fold all of the
pieces in thirds because that's the standard way to
fold a piece of paper for the Post Office. All of that
to say, this Presentation Station normalized the
format of the data and reduced the amount of space it
would take to send it through compression and
resizing.

Now that the data would look like all of the other
data that flows through the network, it gets passed on
to the next layer.

## Layer 5 - Session Layer

This is really the final layer that concerns itself
with application-specific interests. After this, it
gets all networky.

The Session Layer allows devices to establish, manage,
and cleanly end sessions which are just a logical
persistent link between two processes. This layer
allows those two processes to exchange data over a
period of time like minutes, hours, days. The session
that it creates can support bi-directional
communication (like two people talking on the phone at
the same time), unidirectional (like someone on a
megaphone), or "half-duplex" (two-way but only one at
a time, like walkie talkies).

Back in the Post Office, the Session Hessian has
received the movie from the Presentation Station. The
Hessian writes the destination on a little ticket,
puts it in an order carousel like they used to have in
greasy spoons, and yells, "DATA UP!" which alerts
everyone in the back room that another round of data
is ready to be sent and that the Hessian should be
alerted if something fails between this post office
and the receiving post office.

## Layer 4 - Transport Layer

The Transport Layer is a crucial layer in the OSI
model because it bridges the logical application-aware
concerns with the nuts and bolts of the lower layers
that deal with putting data onto and getting it from
the hardware that comprises the network. It provides
the necessary functions to enable communication
between software applications running on different
computers.

The transport layer, is therefore, responsible for
tracking the relationship between the data and the
application from which it came. The Transport Layer is
the last layer that understands that the data is going
to some remote computer perhaps far off in a distant
land; it's the last layer that knows something exists
beyond the current LAN.

As the first layer aware of the lower-level
mechanisms, it also determines how to split up the
data into smaller units, if necessary, and apply
headers to it for tracking, order, and addressing.
Different protocols have different names for those
smaller units: TCP calls them "fragments" and UDP
calls them "datagrams". If the Transport Layer is
receiving data, it is in charge of reassembling those
smaller units into the total message so that,
eventually, the Application Layer can consume all the
data.

The Transport Layer also becomes the one responsible
for implementing end-to-end data transport which can
mean that, in a connection-based model, it takes on
the responsibility of ensuring reliable transmission,
a job that can involve controlling the amount of
traffic it receives from other computers,
acknowledging the receipt of messages, and making sure
it keeps track of which application sent which piece
of data (or to which application incoming data should
go to). It also knows about errors in the messages and
missing messages. As the initiator and maintainer of
connections, it knows how to reïnitiate a connection,
retransmit on timeouts, and what to do in terms of
recovering from an error.

In your Post Office, the video has reached the
Transporter Room where a grumpy guy named Monty
Scottgomery awaits. He knows that the 23,493,785
pieces of paper is too large a package to send on to
the next station. He "fragment"s the whole bunch into
24 bundles, the first 23 containing 1,000,000 sheets
and the last containing the remainder. He puts each
bundle into a box and affixes a label that has a
serial number, the order that the bundle fits into the
overall group of boxes, and the name of the recipient.
In the journal on the table in the corner, he jots
down the serial number and "Google Chrome 0x383A983B"
which is the address of the application from which the
data originated. He takes all of that, makes a copy of
each box, and sends them on to the next station. Since
you paid for guaranteed delivery, Monty will resend a
copy of any of the boxes if he gets a message that one
of them was lost or got damaged along the way. Once he
gets acknowledgement that all of the boxes arrived in
good condition will he get rid of his copies.

## Layer 3 - Network Layer

The Network Layer is where we start getting into the
nuts and bolts of moving bits from one place to
another. This is the layer that contains the address
for the computer as seen by the network at large and
has to be unique to all computers that can see its
connection. For the Internet, the address used is the
IP Address.

The Network Layer's job when sending data is,
conceptually, very easy:

* Get a segment from the Transport Layer and break it
  up into even smaller pieces (called packets) if the
  Layer 2 only supports messages smaller than the one
  the Network Layer has
* Translate the network address to a physical address
  (usually an Address Resolution Protocol invocation)
* Figure out which network interface to send it on
* If enabled by the protocol, provide some error
  handling and diagnostics

The Network Layer's job when receiving data is pretty
much the opposite, reassembling the packets into the
segments or datagrams wanted by the Transport Layer.
When receiving data, it can tell the sender to slow
down because it's getting too full.

This post office station takes the 24 boxes and
determines how to send them to the next destination.
If there is a road between this post office and the
final destination, then it will put it on the loading
dock for the truck bound for that final stop. However,
if there's not a road between them, it will figure out
which outbound truck is the one that will follow the
best route. The 24 boxes go on the loading dock for
the truck and all the other trucks headed in that
direction.

## Layer 2 - Data Link Layer

The Data Link Layer provides the node-to-node transfer
and, when using Ethernet, for example, relies on
Machine Access Control (MAC) addresses to do that. MAC
addresses are seen only within the locally-defined,
directly-connected network. As such, the Data Link
Layer works only within the same space.

The Data Link Layer can break up the Network Layer
packets into frames. It adds more header information,
if necessary, and some boundary information.

The Data Link Layer starts and ends the link between
two directly-connected nodes. It transmits and
receives its frames sequentially. It can make sure the
frames have not been corrupted. It can also drop
duplicate frames.

In the Post Office metaphor, this is the guy on the
loading dock moving the boxes from the loading dock
and onto a truck. The same guy unloads trucks when
they arrive. This guy is busy.

## Layer 1 - Physical Layer

This is the Post Office truck and the road. This is
the easiest layer to understand. It's physical. It
makes signals of zeroes and ones for the actual wires
or fiber or whatever to carry to another terminus.
