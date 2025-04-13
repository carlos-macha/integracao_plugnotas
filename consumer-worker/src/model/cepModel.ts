import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
    cep: {
        type: String,
        required: true,
    },
    bairro: {
        type: String,
        required: true,
    },
    localidade: {
        type: String,
        required: true,
    },
    uf: {
        type: String,
        required: true,
    },
    unidade: {
        type: String,
        required: true,
    },
    ibge: {
        type: String,
        required: true,
    },
    gia: {
        type: String,
        required: true,
    },
}, { _id: false });

const CepSchema = new mongoose.Schema({
    cep: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ["CONCLUIDO", "REJEITADO"],
        default: "REJEITADO",
    },
    data: {
        type: DataSchema,
        required: true,
    }
}, { timestamps: true });

export default mongoose.model('Cep', CepSchema);
