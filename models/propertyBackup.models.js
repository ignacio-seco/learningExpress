import { model, Schema } from 'mongoose';
import propriedadeSchema from './propriedadeSchema.models.js';

const PropertyBackupModel = model('Backup', propriedadeSchema);
export default PropertyBackupModel;
