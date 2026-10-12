import { ContentHeader, UserMenu } from "../../index";
export function Header({ stateConfig }) {
  return (
    <ContentHeader>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <UserMenu stateConfig={stateConfig} />
      </div>
    </ContentHeader>
  );
}
