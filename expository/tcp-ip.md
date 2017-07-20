# Internet Protocol Suite

While the OSI Model has strict boundaries between the
responsibilities of each of the layers, the IPS has a
much looser definition of its layers, emphasizing
architecture over strict layering. Because of this,
the IPS has grown with the Internet, starting with
TCP/IP and adding more protocols at each of the
"layers" as needs arose.

Thanks to AT&T, TCP/IP became the dominanat form of
reliable communication on the Internet for
reliable-delivery network structures. According to
Wikipedia:

> The spread of TCP/IP was fueled further in June
> 1989, when AT&T agreed to place the TCP/IP code
> developed for UNIX into the public domain. Various
> vendors, including IBM, included this code in their
> own TCP/IP stacks. Many companies sold TCP/IP stacks
> for Windows until Microsoft released a native TCP/IP
> stack in Windows 95. This event was a little late in
> the evolution of the Internet, but it cemented
> TCP/IP's dominance over other protocols, which began
> to lose ground.


The IPS has four layers that loosely define the
responsibility of a protocol that fits into that
layer. Again, I cannot stress, the layers are
guidelines and not rigid specifications. Some
protocols have to span multiple layers to work
correctly. I'll include that later.

I'm not sure that a metaphor is needed with IPS
because it's loosely defined layers are more
accessible from a mental model with real protocols
that we're used to using fitting nicely into those
layers. I'll use examples of those protocols to talk
about the layer rather than a metaphor. If I need to
employ analogy, I will make sure to be specific about
its scope.

It's important to note that the layers in IPS have
similar (or identical) names to layers in the OSI. Of
course it's important to distinguish them in
conversation and in your understanding because the IPS
versions have wider-ranging responsibilities than the
layers in OSI that have the same name. Just a caveat.

## Application Layer

The purpose of the Application Layer is to provide
software applications with services of the Internet
like file/data retrieval, send and receive email,
publish messages, and use cryptocurrencies.

Design of the protocols of the Applciation Layer tend
to follow [Jon
Postel](https://en.wikipedia.org/wiki/Jon_Postel)'s
law:

> [build application protocols with] a general
> principle of robustness: be conservative in what you
> do, be liberal in what you accept from others.

Basically, any protocol that uses TCP or UDP lives in
the Application Layer.

### Examples of Application Layer Protocols

* HTTP
* FTP
* SMTP
* DHCP
* DNS
* SSH
* IRC
* RIP ([Routing Information
  Protocol](https://en.wikipedia.org/wiki/Routing_Information_Protocol))
  used to prevent routing loops in networks

## Transport Layer

The transport layer is responsible, based on the
protocol that you're using in the transport layer, to
actually deliver data from one application to another
irrespective of what data that the application sends
and what the underlying network looks like. This layer
is the one that defines and allows binding to *ports*.
Because the transport can be connection-oriented or
connection-less, we should talk about those
separately.

### Connection-Oriented Connections

This is TCP which provides a "one-to-one,
connection-oriented, reliable communication service
responsible for the establishment of a connection, the
sequencing and acknowledgement of packets sent, and
the recovery of packets lost during transmission." It
is characterized as a "reliable stream delivery
service which guarantees that all bytes received will
be identical with bytes sent and in the correct
order." This means that TCP has a higher priority on
accurate delivery than speedy delivery which can cause
long delays when TCP waits for missing or damaged
segments to be resent from the originator of the
message.

TCP creates two-way transmission connections with a
three-step handshake:

1. The client sends a segment with the SYN flag set,
   the port on the client, the port on the server, and
   a random sequence number.
1. The server which has an application running
   listening to the indicated port, replies with a
   segment with the SYN-ACK flag set, the port on the
   server, the port of the client, an acknowledgement
   number that equals the SYN's random sequence number
   plus one, and its own random sequence number.
1. The client sends a segment with the ACK flag set,
   the port on the client, the port on the server, the
   sequence number equal to received acknowledgement
   value, and an acknowledgement value equal to one
   more than the received sequence number.

TCP gracefully terminates a connection with a four-way
handshake:

1. The side that wants to close the connection sends
   a segment with the FIN flag set.
1. The other side sends a segment with the ACK flag
   set.
1. The other side sends a segment with the FIN flag
   set.
1. The original side sends a segment with the ACK flag
   set.

After the side that original side receives the final
ACK segment, it will keep that port open but
unavilable for other applications to bind to so that
any stray segments that may show up late get accepted
and discarded before letting another application bind
to the port.

TCP uses two algorithms to make sure that it recevies
all packets. They are *duplicate cumulative
acknowledgements* and *timeout-based retransmissions*.
The first is based on the sender receiving ACK
segments from the recipient and the second uses a
timer. This provides the reliability of transmission
that TCP is known for.

Finally, the TCP segment has a fairly weak checksum
for the data that it contains to provide a certian
level of error checking for a segment on delivery.

### Connection-Less Connections

This is UDP. It does NOT guarantee delivery, ordering,
removal of duplicates, or error correction. Basically,
you got nothing. And, that's what makes it so much
faster than TCP.

Because there's no "connection" between applications,
there's no handshake to create or end a connection.

There's no retransmission because there's no
"connection".

There's nothing, just datagrams flowing like a river.

## Internet Layer

This is IP. It does two things: addressing (IP
addresses) and routing. That's it. Figure out where a
packet needs to go. Sometimes that's from the actual
client to a server. When it's a router, that means
from one network connection to another network
connection. More concretely, this breaks down into
three basic responsibilities:

* For a packet leaving the device, select the next
  host to where it needs to go, usually the gateway
  for a network or the actual node if it is actuall on
  the same network.
* For a packet arriving at the device, get the packet
  and give it to the Transport Layer, if it should.
* Look for errors in the packets.

Note that there's nothing in those repsonsibilities
that guarantees reliable delivery. That's because, at
its most basic, IP is not responsible for reliable
transmission. That would be the Transport Layer's
responsibility, like we find with TCP.

Here's where we come to an interesting blurring of
responsibilities between protocols at this layer. One
example is ICMP, which is layered on top of IP but is
responsible for its own internetworking functions. The
ICMP messages are contained within standard IP packets
but are handled by special case handlers instead of
the normal IP handler. This means that ICMP works
without ports (which exists in the Transport Layer)
and work on an IP address-wide basis. The OSI Model
would forbid this but provides real value to the
handling of network control and information by
allowing this second layer to process packets in a
special way rather than letting them bubble up to
transport or application layers.

## Link Layer

This is the code in software or in firmware that
translates IP packets to frames to be sent over the
hardware that connects the device to the network.

This layer is responsible for selecting if a packet
from the Internet Layer should go to the normal link,
a virtual private network, or some other networking
tunnel like SSH.

The Link Layer is boring.

## Resources

* Microsoft: [TCP/IP Protocol Architecture](https://technet.microsoft.com/en-us/library/cc958821.aspx)
* Wikpedia: [Internet Protocol Suite](https://en.wikipedia.org/wiki/Internet_protocol_suite)
* Wikipedia [Transmission Control Protocol](https://en.wikipedia.org/wiki/Transmission_Control_Protocol)
