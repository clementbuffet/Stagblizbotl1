import { CreateDareForm } from '@/components/dares/create-dare-form';

export default function CreateDarePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create New Dare</h1>
      <CreateDareForm />
    </div>
  );
}