// 기본 컴포넌트
export { default as Accordion } from './components/Accordion.vue'
export { default as AccountList } from './components/AccountList.vue'
export { default as AttachedFile } from './components/AttachedFile.vue'
export { default as Badge } from './components/Badge.vue'
export { default as BottomSheet } from './components/BottomSheet.vue'
export { default as Breadcrumb } from './components/Breadcrumb.vue'
export { default as Bullet } from './components/Bullet.vue'
export { default as Button } from './components/Button.vue'
export { default as Calendar } from './components/Calendar.vue'
export { default as CardList } from './components/CardList.vue'
export { default as Checkbox } from './components/Checkbox.vue'
export { default as Chip } from './components/Chip.vue'
export { default as Controls } from './components/Controls.vue'
export { default as Cta } from './components/Cta.vue'
export { default as Divider } from './components/Divider.vue'
export { default as Empty } from './components/Empty.vue'
export { default as Filter } from './components/Filter.vue'
export { default as GeneralList } from './components/GeneralList.vue'
export { default as GeneralListExample } from './components/GeneralListExample.vue'
export { default as Indicator } from './components/Indicator.vue'
export { default as Infobox } from './components/Infobox.vue'
export { default as Input } from './components/Input.vue'
export { default as Label } from './components/Label.vue'
export { default as Link } from './components/Link.vue'
export { default as LoadData } from './components/LoadData.vue'
export { default as Navigation } from './components/Navigation.vue'
export { default as NHLogo } from './components/NHLogo.vue'
export { default as PopoverTags } from './components/PopoverTags.vue'
export { default as Popup } from './components/Popup.vue'
export { default as Progress } from './components/Progress.vue'
export { default as Radio } from './components/Radio.vue'
export { default as SearchInterface } from './components/SearchInterface.vue'
export { default as Select } from './components/Select.vue'
export { default as Summary } from './components/Summary.vue'
export { default as Switch } from './components/Switch.vue'
export { default as Tab } from './components/Tab.vue'
export { default as Table } from './components/Table.vue'
export { default as Terms } from './components/Terms.vue'
export { default as TextInput } from './components/TextInput.vue'
export { default as Toast } from './components/Toast.vue'
export { default as Tooltip } from './components/Tooltip.vue'
export { default as TooltipIcon } from './components/TooltipIcon.vue'

// 아이콘 컴포넌트
export { default as ArrowDownIcon } from './components/icons/ArrowDownIcon.vue'
export { default as ArrowUpIcon } from './components/icons/ArrowUpIcon.vue'
export { default as IconArrowDown } from './components/icons/IconArrowDown.vue'
export { default as IconArrowUp } from './components/icons/IconArrowUp.vue'
export { default as IconChevronRight } from './components/icons/IconChevronRight.vue'
export { default as IconCsCenter } from './components/icons/IconCsCenter.vue'
export { default as IconDownload } from './components/icons/IconDownload.vue'
export { default as IconEllipsis } from './components/icons/IconEllipsis.vue'
export { default as IconHome } from './components/icons/IconHome.vue'
export { default as IconNotice } from './components/icons/IconNotice.vue'
export { default as NoticeIcon } from './components/icons/NoticeIcon.vue'

// 플러그인 형태로도 제공
import type { App } from 'vue'

// 모든 컴포넌트들을 하나의 객체로 모음
import Accordion from './components/Accordion.vue'
import AccountList from './components/AccountList.vue'
import AttachedFile from './components/AttachedFile.vue'
import Badge from './components/Badge.vue'
import BottomSheet from './components/BottomSheet.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import Bullet from './components/Bullet.vue'
import Button from './components/Button.vue'
import Calendar from './components/Calendar.vue'
import CardList from './components/CardList.vue'
import Checkbox from './components/Checkbox.vue'
import Chip from './components/Chip.vue'
import Controls from './components/Controls.vue'
import Cta from './components/Cta.vue'
import Divider from './components/Divider.vue'
import Empty from './components/Empty.vue'
import Filter from './components/Filter.vue'
import GeneralList from './components/GeneralList.vue'
import GeneralListExample from './components/GeneralListExample.vue'
import Indicator from './components/Indicator.vue'
import Infobox from './components/Infobox.vue'
import Input from './components/Input.vue'
import Label from './components/Label.vue'
import Link from './components/Link.vue'
import LoadData from './components/LoadData.vue'
import Navigation from './components/Navigation.vue'
import NHLogo from './components/NHLogo.vue'
import PopoverTags from './components/PopoverTags.vue'
import Popup from './components/Popup.vue'
import Progress from './components/Progress.vue'
import Radio from './components/Radio.vue'
import SearchInterface from './components/SearchInterface.vue'
import Select from './components/Select.vue'
import Summary from './components/Summary.vue'
import Switch from './components/Switch.vue'
import Tab from './components/Tab.vue'
import Table from './components/Table.vue'
import Terms from './components/Terms.vue'
import TextInput from './components/TextInput.vue'
import Toast from './components/Toast.vue'
import Tooltip from './components/Tooltip.vue'
import TooltipIcon from './components/TooltipIcon.vue'

// 아이콘들
import ArrowDownIcon from './components/icons/ArrowDownIcon.vue'
import ArrowUpIcon from './components/icons/ArrowUpIcon.vue'
import IconArrowDown from './components/icons/IconArrowDown.vue'
import IconArrowUp from './components/icons/IconArrowUp.vue'
import IconChevronRight from './components/icons/IconChevronRight.vue'
import IconCsCenter from './components/icons/IconCsCenter.vue'
import IconDownload from './components/icons/IconDownload.vue'
import IconEllipsis from './components/icons/IconEllipsis.vue'
import IconHome from './components/icons/IconHome.vue'
import IconNotice from './components/icons/IconNotice.vue'
import NoticeIcon from './components/icons/NoticeIcon.vue'

const components = {
  Accordion,
  AccountList,
  AttachedFile,
  Badge,
  BottomSheet,
  Breadcrumb,
  Bullet,
  Button,
  Calendar,
  CardList,
  Checkbox,
  Chip,
  Controls,
  Cta,
  Divider,
  Empty,
  Filter,
  GeneralList,
  GeneralListExample,
  Indicator,
  Infobox,
  Input,
  Label,
  Link,
  LoadData,
  Navigation,
  NHLogo,
  PopoverTags,
  Popup,
  Progress,
  Radio,
  SearchInterface,
  Select,
  Summary,
  Switch,
  Tab,
  Table,
  Terms,
  TextInput,
  Toast,
  Tooltip,
  TooltipIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  IconArrowDown,
  IconArrowUp,
  IconChevronRight,
  IconCsCenter,
  IconDownload,
  IconEllipsis,
  IconHome,
  IconNotice,
  NoticeIcon
}

export const NhcxUIComponents = {
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  }
}

export default NhcxUIComponents