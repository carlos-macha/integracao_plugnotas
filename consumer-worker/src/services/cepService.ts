import axios from "axios";
import Cep from "../model/cepModel";

class cepService {
    async consultCep(id: string) {

        try {
            const findCep = await Cep.findById(id);
            if (!findCep) return;

            const response = await axios.get(`https://viacep.com.br/ws/${findCep.cep}/json/`);
            const data = response.data;

            if (data.erro) {
                await Cep.findByIdAndUpdate(id,
                    {
                        status: "REJEITADO"
                    }
                );
                return;
            }

            await Cep.findByIdAndUpdate(
                id,
                {
                    data: data,
                    status: "CONCLUIDO"
                },
            );

            return;
        } catch (error) {
            console.error("Erro ao consultar CEP:", error);
            return;
        }
    }
}

export default cepService;