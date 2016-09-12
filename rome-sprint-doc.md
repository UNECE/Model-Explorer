# Useful documentation for the Rome IMS sprint

## Queries

This query list all the predicates in the GSIM graph :

```sparql
select * FROM <http://stamina-project.org/graphs/gsim>
where {?s ?p ?o}
```

```sparql
prefix gsbpm: <http://rdf.unece.org/models/gsbpm#>
select * where {
 ?s  a gsbpm:Phase
}
```

## Namespaces

GSBPM

```
@prefix gsbpm: <http://rdf.unece.org/models/gsbpm#> .
```

