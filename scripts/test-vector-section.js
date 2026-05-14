export default function testVectorSection(entry) {
  const { alg } = entry;
  return `## ${alg}
{: toc="exclude"}

~~~ json
{::include-fold69hardleft4dry examples/jwks/${alg}.json}
~~~
{: title="${alg} Private JWK"}

~~~ json
{::include-fold69hardleft4dry examples/jwe/${alg}-flattened.json}
~~~
{: title="${alg} Flattened JWE JSON Serialization"}

~~~
{::include-fold69hardleftdry examples/jwe/${alg}-compact.txt}
~~~
{: title="${alg} JWE Compact Serialization"}`;
}
