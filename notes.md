the "edges" of the virtual tree,
meaning the distinct points of difference between the virtual tree and the DOM tree

an edge can be:

- where a virtual node exists but the dom node does not
- where a virtual node does not exist but the dom node does

whether either of these scenarios

- does the virtual node have an ID? if so, it's a direct match
- else...
- does the virtual node have attributes? if so it's either going to be a querySelectorAll or an xpath query
- does the virtual node have _only_ text child nodes? if so then it's an xpath query against (a) the tagName, (b) the attributes, and (c) the text content
- else...
- it's a querySelectorAll against (a) the tagName and (b) the attributes

a hectal structure:

```
{
  virtual: null | {
    parent: null | Node,
    previous: null | Node,
    next: null | Node,
  },
  dom: null | {
    parent: null | Node,
    previous: null | Node,
    next: null | Node,
  },
}
```
