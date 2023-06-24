import { Button } from '@selenium-design/components';

export default function () {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <div>
        <Button type={'primary'}>primary</Button>
      </div>
      <div>
        <Button type={'secondary'}>secondary</Button>
      </div>
      <div>
        <Button type={'tertiary'}>tertiary</Button>
      </div>
      <div>
        <Button type={'default'}>default</Button>
      </div>
      <div>
        <Button type={'text'}>text</Button>
      </div>
      <div>
        <Button type={'link'}>link</Button>
      </div>
    </div>
  );
}
