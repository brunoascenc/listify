import { sectionTitle } from '@/utils/tasks/ui';

describe('sectionTitle', () => {
  it('returns the title for each filter', () => {
    expect(sectionTitle('all')).toBe('Todas as tarefas');
    expect(sectionTitle('today')).toBe('Tarefas do dia');
    expect(sectionTitle('scheduled')).toBe('Tarefas agendadas');
    expect(sectionTitle('overdue')).toBe('Tarefas atrasadas');
  });
});
