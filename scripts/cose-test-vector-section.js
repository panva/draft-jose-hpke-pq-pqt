export default function coseTestVectorSection(entry) {
  const { alg, isKE } = entry;
  const encryptType = isKE ? "COSE_Encrypt" : "COSE_Encrypt0";
  return `## ${alg}
{: toc="exclude"}

~~~ cbor-diag
{::include-fold69hardleft4dry examples/cose-keys/${alg}-diag.txt}
~~~
{: title="${alg} COSE_Key (Diagnostic Notation)"}

~~~
{::include-fold69hardleftdry examples/cose-keys/${alg}-hex.txt}
~~~
{: title="${alg} COSE_Key (Hex-Encoded CBOR)"}

~~~ cbor-diag
{::include-fold69hardleft4dry examples/cose/${alg}-diag.txt}
~~~
{: title="${alg} ${encryptType} (Diagnostic Notation)"}

~~~
{::include-fold69hardleftdry examples/cose/${alg}-hex.txt}
~~~
{: title="${alg} ${encryptType} (Hex-Encoded CBOR)"}`;
}
