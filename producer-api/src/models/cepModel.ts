import mongoose from 'mongoose';

const CepSchema = new mongoose.Schema({
    cep: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      default: "PENDENTE",
    },
  }, { timestamps: true });
  
export default mongoose.model('Cep', CepSchema);