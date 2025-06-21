import React, { useState } from "react";
import type { EstruturaItem } from "../App";

interface Props {
  adicionarItem: (item: EstruturaItem) => void;
}

const EstruturaItemForm: React.FC<Props> = ({ adicionarItem }) => {
  const [item, setItem] = useState<EstruturaItem>({
    idMaterial: 0,
    nomeMaterial: "",
    quantidade: 0,
  });

const handleAdd = () => {
    if (item.idMaterial <= 0) {
        alert("Código do material deve ser maior que zero.");
        return;
    }
    if (!item.nomeMaterial.trim()) {
        alert("Nome do material não pode estar vazio.");
        return;
    }
    if (item.quantidade <= 0) {
        alert("Quantidade deve ser maior que zero.");
        return;
    }

    adicionarItem(item);
    setItem({ idMaterial: 0, nomeMaterial: "", quantidade: 0 });
};


  return (
    <section>
      <h3>Adicionar Item à Estrutura</h3>
      <form>
        <label htmlFor="idMaterial">Cód. Material</label>
        <input
            type="number"
            name="idMaterial"
            min={1}
            value={item.idMaterial}
            onChange={(e) => setItem({ ...item, idMaterial: Number(e.target.value) })}
        />
        <input
            type="text"
            name="nomeMaterial"
            value={item.nomeMaterial}
            onChange={(e) => setItem({ ...item, nomeMaterial: e.target.value })}
        />
        <input
            type="number"
            name="quantidade"
            min={1}
            value={item.quantidade}
            onChange={(e) => setItem({ ...item, quantidade: Number(e.target.value) })}
        />
        <button type="button" onClick={handleAdd}>Adicionar</button>
      </form>
    </section>
  );
};

export default EstruturaItemForm;
