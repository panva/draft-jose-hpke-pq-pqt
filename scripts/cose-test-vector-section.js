export default function coseTestVectorSection(entry) {
  const { alg, isKE } = entry;
  const encryptType = isKE ? "COSE_Encrypt" : "COSE_Encrypt0";
  return `## ${alg}
{: toc="exclude"}

~~~ cbor-diag
{::include examples/cose-keys/${alg}-diag.txt}
~~~
{: title="${alg} COSE_Key (Diagnostic Notation)"}

~~~
{::include examples/cose-keys/${alg}-hex.txt}
~~~
{: title="${alg} COSE_Key (Hex-Encoded CBOR)"}

~~~ cbor-diag
{::include examples/cose/${alg}-diag.txt}
~~~
{: title="${alg} ${encryptType} (Diagnostic Notation)"}

~~~
{::include examples/cose/${alg}-hex.txt}
~~~
{: title="${alg} ${encryptType} (Hex-Encoded CBOR)"}`;
}
