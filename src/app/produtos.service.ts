import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Produto } from '../app/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  baseURL = "http://localhost:8080/api/produtos";

  constructor(private http : HttpClient) { }

  getProdutos() : Observable<Produto[]> {
    return this.http.get<Produto[]>(this.baseURL);
  }

  cadastrarProduto(produto: Produto) : Observable<any>{
    let body = new HttpParams();
    body = body.set("titulo", produto.titulo);
    body = body.set("preco", String(produto.preco));
    body = body.set("descricao", produto.descricao);
    return this.http.post(this.baseURL, body, {observe: "response"});
  }

  deletarProduto(id: string): Observable<any> {
    return this.http.delete(this.baseURL + "/" + id);
  }

  atualizarProduto(id: string, produto: Produto): Observable<any> {
    let body = new HttpParams();
    body = body.set("_id", produto._id);
    body = body.set("titulo", produto.titulo);
    body = body.set("descricao", produto.descricao);
    body = body.set("preco", String(produto.preco));
    body = body.set("createdAt", produto.createdAt);
    body = body.set("updatedAt", String(Date.now()));
    body = body.set("__v", String(produto.__v + 1));
    return this.http.put<Produto>(this.baseURL + "/" + id, body);
  }
}
