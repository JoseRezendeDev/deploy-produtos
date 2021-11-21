import { Component, OnInit } from '@angular/core';
import { Produto } from '../Produto';
import { ProdutosService } from '../produtos.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  listaProdutos: Produto[];

  atualizar: boolean = false;
  produtoAtualizar: Produto = {
    titulo: "",
    descricao: "",
    preco: 0
  };

  produtoCadastrar: Produto = {
    titulo: "",
    descricao: "",
    preco: 0
  };

  constructor(private produtosService: ProdutosService) { }

  ngOnInit(): void {
    this.produtosService.getProdutos().subscribe(res => {
      console.log(res);
      
      this.listaProdutos = res;
      this.produtoAtualizar = this.listaProdutos[0];
    });
  }

  atualizarProduto() {
    this.produtosService.atualizarProduto(this.produtoAtualizar._id, this.produtoAtualizar).subscribe(res => {
      alert(res.msg);
    });
  }

  exibirAtualizar(_id: string) {
    this.produtoAtualizar = this.listaProdutos.find(p => p._id === _id);
    this.atualizar = true;
  }

  deletarProduto(_id: string) : void {
    this.produtosService.deletarProduto(_id).subscribe(res => {
      alert(res.msg);
    })
  }

  cadastrarProduto() {
    this.produtosService.cadastrarProduto(this.produtoCadastrar).subscribe(res => {
      console.log(res);
    })
  }

}
